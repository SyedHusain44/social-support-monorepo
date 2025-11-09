const STORAGE_KEY = 'socialSupportApplication';

export const saveFormData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save form data:', error);
    return false;
  }
};

export const loadFormData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load form data:', error);
    return null;
  }
};

export const clearFormData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear form data:', error);
    return false;
  }
};
