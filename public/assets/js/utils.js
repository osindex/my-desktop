function getCookie(key, defaultValue = null) {
	return window.$cookies.get(key) == null ? defaultValue : window.$cookies.get(key)
}
function getOffset(el, offset) {
	// left right bottom
	const elOffset = offset === "bottom" ? el.offsetTop : (offset === "left" ? el.offsetLeft : el.offsetRight);
    if (el.offsetParent == null) {
      return elOffset;
    }
    return elOffset + getOffset(el.offsetParent, offset);
}