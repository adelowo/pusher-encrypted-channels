var submitFeedBtn = document.getElementById('feed-form');
var isDangerDiv = document.getElementById('error');
var isSuccessDiv = document.getElementById('success');

submitFeedBtn.addEventListener('submit', function(e) {
  isDangerDiv.classList.add('hidden');
  isSuccessDiv.classList.add('hidden');
  e.preventDefault();
  var title = document.getElementById('title');
  var content = document.getElementById('content');

  if (title.value.length === 0) {
    isDangerDiv.classList.remove('hidden');
    isDangerDiv.innerHTML = 'Title field is required';
    return;
  }

  if (content.value.length === 0) {
    isDangerDiv.classList.remove('hidden');
    isDangerDiv.innerHTML = 'Content field is required';
    return;
  }

  fetch('http://localhost:1400/feed', {
    method: 'POST',
    body: JSON.stringify({ title: title.value, content: content.value }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(
    function(response) {
      if (response.status === 200) {
        isSuccessDiv.innerHTML = 'Feed item was successfully added';
        isSuccessDiv.classList.remove('hidden');
        setTimeout(function() {
          isSuccessDiv.classList.add('hidden');
        }, 1000);
        return;
      }

      if (response.status === 208) {
        message = 'Feed item already exists';
      } else {
        message = response.statusText;
      }

      isDangerDiv.innerHTML = message;
      isDangerDiv.classList.remove('hidden');
    },
    function(error) {
      isDangerDiv.innerHTML = 'Could not create feed item';
      isDangerDiv.classList.remove('hidden');
    }
  );
});
