
// Clear all caches and service workers to remove phantom services
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service worker unregistered');
    }
  });
}

if ('caches' in window) {
  caches.keys().then(function(names) {
    names.forEach(function(name) {
      caches.delete(name);
      console.log('Cache deleted:', name);
    });
  });
}

// Clear localStorage and sessionStorage
try {
  localStorage.clear();
  sessionStorage.clear();
  console.log('Storage cleared');
} catch (e) {
  console.log('Could not clear storage');
}

console.log('Cache clearing script executed');
