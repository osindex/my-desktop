function getCookie(key, defaultValue = null) {
	return window.$cookies.get(key) == null ? defaultValue : window.$cookies.get(key)
}