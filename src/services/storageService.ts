export function saveUserData(userId: string) {
  sessionStorage.setItem('userId', userId);
}

export function loadUserData() {
  return sessionStorage.getItem('userId');
}
