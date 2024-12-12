self.addEventListener('push', function(event) {
    const data = event.data.json();
    const title = data.title || 'New Notification';
    const options = {
      body: data.body,
      icon: data.icon || '/default-icon.png',
      badge: data.badge || '/badge-icon.png'
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  