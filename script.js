(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')
  const form = document.querySelector('form');
  const dropdown = document.getElementById('posts');

  example.addEventListener("click", function() {
    fetch('https://restcountries.com/')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function() {
    answer.innerHTML = "Loading..."

    setTimeout(function() {
      fetch('https://restcountries.com/')
        .then(response => response.json())
        .then(array => {
          console.log(array)
          
          let html = `
            <h3>Create New Post</h3>
            <form id="newPostForm">
              <label for="postTitle">Title:</label><br>
              <input type="text" id="postTitle" name="title" required style="width: 100%; padding: 5px; margin: 10px 0;"><br>
              
              <label for="postBody">Content:</label><br>
              <textarea id="postBody" name="body" required style="width: 100%; padding: 5px; margin: 10px 0; min-height: 100px;"></textarea><br>
              
              <button type="submit" style="padding: 10px 20px; margin-top: 10px;">Send Post</button>
            </form>
            <div id="postResult" style="margin-top: 20px;"></div>
            
            <hr style="margin: 30px 0;">
            
            <h3>All Posts</h3>
            <ul>
          `;
          
          array.forEach(post => {
            html += `
            <li>
              <strong>${post.title}</strong>
              <p>${post.body}</p>
            </li>
            `;
          });
          
          html += '</ul>';
          answer.innerHTML = html;
          
          const newPostForm = document.getElementById('newPostForm');
          const postResult = document.getElementById('postResult');
          
          newPostForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const title = document.getElementById('postTitle').value;
            const body = document.getElementById('postBody').value;
            
            postResult.innerHTML = "Sending...";
            
            fetch('https://restcountries.com/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
              })
            })
              .then(response => response.json())
              .then(data => {
                console.log('Success:', data);
                postResult.innerHTML = `
                  <div style="background: #d4edda; padding: 15px; border-radius: 5px; color: #155724;">
                    <h4>Post Created Successfully!</h4>
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Title:</strong> ${data.title}</p>
                    <p><strong>Body:</strong> ${data.body}</p>
                  </div>
                `;
                newPostForm.reset();
              })
              .catch(error => {
                console.error('Error:', error);
                postResult.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
              });
          });
        })
    }, 2000);

  })


  cw2.addEventListener("click", function() {
   
  })

  cw3.addEventListener("click", function() {
    //TODO
  })
  form.addEventListener('submit', function(event) {
    event.preventDefault();  // Stop the page from refreshing

    const postId = dropdown.value;  // Get selected value (1, 2, 3, etc.)

    console.log('Selected post:', postId);

    // Fetch that specific post
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        console.log(post);
        answer.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        `;
      });
  });
})();
