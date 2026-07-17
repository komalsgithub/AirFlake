document.querySelectorAll('.flip-toggle-button').forEach(button => {
  button.addEventListener('click', () => {
    const wrapper = button.closest('.photo-image-wrapper');
    wrapper.classList.toggle('flipped');
  });
});

// add photo
  function previewPhoto(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("photoPreview");
    preview.innerHTML = ""; // Clear previous

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const isVideo = file.type.startsWith("video");
        const element = isVideo
          ? document.createElement("video")
          : document.createElement("img");

        element.src = e.target.result;
        if (isVideo) element.controls = true;
        preview.appendChild(element);
      };
      reader.readAsDataURL(file);
    }
  }

  function selectQuote(quote) {
      // redirect back to focus.html and pass quote in URL
      const encoded = encodeURIComponent(quote);
      window.location.href = "focus.html?quote=" + encoded;
    }