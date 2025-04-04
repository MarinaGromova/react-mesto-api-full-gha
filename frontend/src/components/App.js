import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import errorImage from '../images/error.svg'
import successImage from '../images/union.svg'
import api from '../utils/Api'
import * as auth from '../utils/Auth'
import AddPlacePopup from './AddPlacePopup'
import DeleteCard from './DeleteCard'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import Footer from './Footer'
import Header from './Header'
import ImagePopup from './ImagePopup'
import InfoTooltip from './InfoTooltip'
import Login from './Login'
import Main from './Main'
import ProtectedRoute from './ProtectedRoute'
import Register from './Register'

const App = () => {
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
	const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
	const [selectedCard, setSelectedCard] = useState(null)
	const [currentUser, setCurrentUser] = useState({})
	const [cards, setCards] = useState([])
	const [renderLoading, setrenderLoading] = useState(false)
	const [loggedIn, setLoggedIn] = useState(false)
	const [cardToDelete, setCardToDelete] = useState('')

	const [infoTooltip, setInfoTooltip] = useState(false)
	const [emailLogin, setEmailLogin] = useState(null)
	const [isImagePopup, setImagePopup] = useState('')
	const [isTitlePopup, setTitlePopup] = useState('')
	const navigate = useNavigate()

	//регистрация
	const handleRegister = ({ password, email }) => {
		return auth
			.register(password, email)
			.then(() => {
				setImagePopup(successImage)
				setTitlePopup('Вы успешно зарегистрировались!')
				navigate('/sign-in')
			})
			.catch(() => {
				setImagePopup(errorImage)
				setTitlePopup('Что-то пошло не так! Попробуйте ещё раз.')
			})
			.finally(handleInfoTooltip)
	}

	//запрос на авторизацию
	const handleLogin = ({ password, email }) => {
		return auth
			.authorize(password, email)
			.then(response => {
				if (response.token) {
					setEmailLogin(email)
					localStorage.setItem('jwt', response.token)
					setLoggedIn(true)
					navigate("'/sign-in', {replace: true}")
				}
			})
			.catch(() => {
				setImagePopup(errorImage)
				setTitlePopup('Что-то пошло не так! Попробуйте ещё раз.')
				handleInfoTooltip()
			})
	}

	useEffect(() => {
		const token = localStorage.getItem('jwt')
		if (token) {
			auth
				.tockenCheck(token)
				.then(res => {
					setLoggedIn(true)
					setEmailLogin(res.email)
					navigate('/', { replace: true })
				})
				.catch(error => {
					console.log(error)
				})
		}
	}, [navigate])

	useEffect(() => {
		if (loggedIn) {
			Promise.all([api.getUserInfo(), api.getInitialCards()])
				.then(([user, cards]) => {
					setCards(cards)
					setCurrentUser(user)
				})
				.catch(err => console.log(err))
		}
	}, [loggedIn])

	const handleAddPlaceSubmit = data => {
		setrenderLoading(true)
		api
			.postAddCard(data)
			.then(res => {
				setCards([res, ...cards])
				closeAllPopups()
			})
			.catch(err => console.log(`Ошибка: ${err}`))
			.finally(() => setrenderLoading(false))
	}

	const onSignOut = () => {
		localStorage.removeItem('jwt')
		setLoggedIn(false)
		setEmailLogin(null)
		navigate("/sign-in', {replace: true}")
	}

	useEffect(() => {
		const closeByEscape = e => {
			if (e.key === 'Escape') {
				closeAllPopups()
			}
		}
		document.addEventListener('keydown', closeByEscape)
		return () => {
			document.removeEventListener('keydown', closeByEscape)
		}
	}, [
		isEditAvatarPopupOpen,
		isEditProfilePopupOpen,
		isAddPlacePopupOpen,
		infoTooltip,
	])

	const handleEditAvatarClick = () => {
		setEditAvatarPopupOpen(true)
	}
	const handleEditProfileClick = () => {
		setEditProfilePopupOpen(true)
	}
	const handleAddPlaceClick = () => {
		setAddPlacePopupOpen(true)
	}

	const handleCardClick = card => {
		setrenderLoading(true)
		setSelectedCard({ name: card.name, link: card.link })
	}

	const handleInfoTooltip = () => {
		setInfoTooltip(true)
	}

	const handleCardDelete = card => {
		api
			.deleteCard(card._id)
			.then(newCard => {
				setCards(cards.filter(c => (c._id === card._id ? '' : newCard)))
			})
			.catch(err => console.log(`Ошибка: ${err}`))
			.finally(() => setrenderLoading(false))
	}

	const handleCardLike = card => {
		const isLiked = card.likes.some(id => id === currentUser._id)
		if (!isLiked) {
			api
				.handleLike(card._id)
				.then(newCard => {
					setCards(cards => cards.map(c => (c._id === card._id ? newCard : c)))
				})
				.catch(err => console.log(`Ошибка: ${err}`))
		} else {
			api
				.deleteLike(card._id)
				.then(newCard => {
					setCards(cards => cards.map(c => (c._id === card._id ? newCard : c)))
				})
				.catch(err => console.log(`Ошибка: ${err}`))
		}
	}

	const handleUpdateUser = data => {
		setrenderLoading(true)
		api
			.patchUserInfo(data)
			.then(res => {
				setCurrentUser(res)
				closeAllPopups()
			})
			.catch(err => console.log(`Ошибка: ${err}`))
			.finally(() => setrenderLoading(false))
	}

	const handleUpdateAvatar = avatar => {
		setrenderLoading(true)
		api
			.patchAvatarUrl(avatar)
			.then(result => {
				setCurrentUser(result)
				closeAllPopups()
			})
			.catch(err => console.log(`Ошибка: ${err}`))
			.finally(() => setrenderLoading(false))
	}

	const closeAllPopups = () => {
		setEditAvatarPopupOpen(false)
		setEditProfilePopupOpen(false)
		setAddPlacePopupOpen(false)
		setSelectedCard(false)
		setInfoTooltip(false)
		setIsDeletePopupOpen(false)
	}

	const handleDeleteClick = cardId => {
		setIsDeletePopupOpen(true)
		setCardToDelete(cardId)
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='root'>
				<div className='page'>
					<Routes>
						<Route
							path='/sign-up'
							element={
								<>
									<Header title='Войти' route='/sign-in' />
									<Register onRegister={handleRegister} />
								</>
							}
						/>
						<Route
							path='/sign-in'
							element={
								<>
									<Header title='Регистрация' route='/sign-up' />
									<Login onLogin={handleLogin} />
								</>
							}
						/>
						<Route
							path='/'
							element={
								<>
									<Header
										title='Выйти'
										route='/sign-in'
										mail={emailLogin}
										onClick={onSignOut}
									/>
									<ProtectedRoute
										loggedIn={loggedIn}
										component={Main}
										onEditAvatar={handleEditAvatarClick}
										onEditProfile={handleEditProfileClick}
										onAddPlace={handleAddPlaceClick}
										onCardClick={handleCardClick}
										cards={cards}
										onCardLike={handleCardLike}
										onDeleteCard={handleDeleteClick}
									/>
									<Footer />
								</>
							}
						/>
						<Route
							path='*'
							element={<Navigate to={loggedIn ? '/' : '/sign-in'} />}
						/>
					</Routes>
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
						renderLoading={renderLoading ? 'Сохранение...' : 'Сохранить'}
					/>
					<DeleteCard
						cardId={cardToDelete}
						isOpen={isDeletePopupOpen}
						onClose={closeAllPopups}
						onCardDelete={handleCardDelete}
						renderLoading={renderLoading}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
						renderLoading={renderLoading ? 'Сохранение...' : 'Создать'}
					/>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
						renderLoading={renderLoading ? 'Сохранение...' : 'Сохранить'}
					/>
					<ImagePopup card={selectedCard} onClose={closeAllPopups} />
					<InfoTooltip
						isOpen={infoTooltip}
						onClose={closeAllPopups}
						image={isImagePopup}
						title={isTitlePopup}
					/>
				</div>
			</div>
		</CurrentUserContext.Provider>
	)
}

export default App
