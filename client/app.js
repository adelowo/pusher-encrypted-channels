(function() {
  const submitFeedBtn = document.getElementById('feed-form');
  const isDangerDiv = document.getElementById('error');
  const isSuccessDiv = document.getElementById('success');

  if (submitFeedBtn !== null) {
    submitFeedBtn.addEventListener('submit', function(e) {
      isDangerDiv.classList.add('hidden');
      isSuccessDiv.classList.add('hidden');
      e.preventDefault();
      const title = document.getElementById('title');
      const content = document.getElementById('content');

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
  }

  const tmpl = `
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{title}}</strong>
                <small>{{createdAt}}</small> <br />
                {{content}}
              </p>
            </div>
          </div>
        </article>
      </div>
`;

  const APP_KEY = 'PUSHER_APP_KEY';
  const APP_CLUSTER = 'eu';

  Pusher.logToConsole = true;

  const pusher = new Pusher(APP_KEY, {
    cluster: APP_CLUSTER,
    authEndpoint: 'http://localhost:1400/pusher/auth',
  });

  const channel = pusher.subscribe('private-encrypted-feeds');
  const template = Handlebars.compile(tmpl);
  const feedDiv = document.getElementById('feed');

  channel.bind('items', function(data) {
    const html = template(data);

    const divElement = document.createElement('div');
    divElement.innerHTML = html;

    feedDiv.appendChild(divElement);
  });
})();
