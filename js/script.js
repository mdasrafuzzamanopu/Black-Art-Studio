// Blackbox API
const blackbox = new Blackbox({
    apiKey: "bbk_1234567890abcdefghijklmnopqrstuvwxyz",
    container: 'blog-posts',
    // Add the API URL based on the environment
    apiUrl: (() => {
      if (window.location.hostname === 'localhost') {
        return 'https://192.168.0.159:5500/api/blackbox'; 
      } else if (window.location.hostname === 'vercel.app') {
        return 'https://api.vercel.blackbox.io';
      } else {
        return 'https://api.blackbox.io';
      }
    })(),
  });
  
  console.log('Blackbox API initialized:', blackbox);
  
  blackbox.getPosts({
    categories: ['testing', 'react', 'ecommerce', 'ai'],
    limit: 5,
  })
  
    .then(response => {
      console.log('Get posts successful:', response);
      const posts = response.data.posts;
      console.log('Posts Array:', posts);
      if (posts && posts.length > 0) {
        let html = '';
        posts.forEach(post => {
          console.log('Post:', post);
          html += `
            <div class="h-entry">
              <h2 class="font-size-regular"><a href="${post.url}">${post.title}</a></h2>
              <div class="meta mb-4">${post.author} <span class="mx-2">&bullet;</span> ${post.date}<span class="mx-2">&bullet;</span> <a href="#">${post.category}</a></div>
              <p>${post.excerpt}</p>
              <p><a href="${post.url}">Continue Reading...</a></p>
            </div>
            `;
        });
        console.log('HTML:', html);
        document.getElementById('blog-posts').innerHTML = html;
      } else {
        console.log('No posts found');
      }
    })
    .catch(error => {
      console.error('Error getting posts:', error);
    });