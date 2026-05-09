/**
 * UI Messages
 * Centralized localization strings for UI components
 */

export const MESSAGES = {
	// Common actions
	save: 'Зберегти',
	cancel: 'Скасувати',
	delete: 'Видалити',
	edit: 'Редагувати',
	add: 'Додати',
	close: 'Закрити',
	back: 'Назад',
	next: 'Далі',
	previous: 'Попередній',
	submit: 'Відправити',

	// Loading states
	loading: 'Завантаження...',
	saving: 'Збереження...',
	deleting: 'Видалення...',
	updating: 'Оновлення...',

	// States
	success: 'Успішно!',
	error: 'Помилка!',
	warning: 'Попередження!',
	info: 'Інформація',

	// Form messages
	fillRequiredFields: 'Будь ласка, заповніть обов\'язкові поля',
	invalidEmail: 'Невалідна електронна пошта',
	passwordTooShort: 'Пароль занадто короткий',
	passwordMismatch: 'Паролі не збігаються',

	// Dialog titles
	confirmDelete: 'Підтвердити видалення',
	editItem: 'Редагувати',
	createItem: 'Створити',
	settings: 'Налаштування',

	// Tooltips
	addNew: 'Додати новий елемент',
	goBack: 'Повернутися назад',
	toggleTheme: 'Перемкнути тему',
	toggleMenu: 'Розкрити меню',
	userSettings: 'Налаштування користувача',

	// Notifications
	savedSuccessfully: 'Успішно збережено',
	deletedSuccessfully: 'Успішно видалено',
	updatedSuccessfully: 'Успішно оновлено',
	operationFailed: 'Операція не вдалася',

	// Validation
	required: 'Обов\'язкове поле',
	minLength: 'Мінімальна довжина',
	maxLength: 'Максимальна довжина',

	// Auth
	loginTitle: 'Вхід',
	registerTitle: 'Реєстрація',
	logout: 'Вихід',
	login: 'Увійти',
	register: 'Зареєструватися',

	// Board
	createBoard: 'Створити дошку',
	editBoard: 'Редагувати дошку',
	deleteBoard: 'Видалити дошку',
	newColumn: 'Нова колона',
	newTask: 'Нове завдання',
	taskDetails: 'Деталі завдання',

	// Empty states
	noItems: 'Немає елементів',
	emptyBoard: 'Дошка пуста',
	startCreating: 'Почніть створювати',
} as const;

/**
 * Type for message keys
 */
export type MessageKey = keyof typeof MESSAGES;

/**
 * Get message by key with type safety
 */
export function getMessage(key: MessageKey): string {
	return MESSAGES[key];
}
