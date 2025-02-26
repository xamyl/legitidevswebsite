<div class="main-container">
  <div class="title-container">
    <h1>Donate</h1>
  </div>
  <div class="content-container">
    <p>Legitidevs runs on a VPS (supplied by Skye) paid for by donations. Your donations help us keep our API, website, and other services running smooth without crashes, or downtime. If you can donate, please do. Every contribution counts, whatever the size.</p>
    <p class="secondary-stuff">Also, you might be able to get a rank on Skye Network!</p>
    <br><p>Please use this template when donating:</p>
    <blockquote><br>
    [Your Message]<br>
    <br>
    Legitidevs<br>
    [Your Discord Username]<br>
  </blockquote>
    <a href="https://paypal.me/skyenetworkmc" target="_blank" class="donate-button">
      <h2>Donate here!</h2>
    </a>
    <img src="/img/lobby.png" alt="Legitimoose Lobby" class="donate-image">
  </div>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    background-color: light-dark(var(--main-light), var(--main-dark));
    min-height: 100vmin;
    max-width: 100vw;
    align-items: center;
  }

  .title-container {
    display: flex;
    background-color: light-dark(var(--secondary-light), var(--secondary-dark));
    width: 100%;
    height: 300px;
    align-items: center;
    justify-content: center;
  }

  .secondary-stuff {
    font-size: 0.6em;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    margin: 15em;
    margin-top: 1em; 
    margin-bottom: 1em;
  }

  h2 {
    margin: 5px 0;
    font-size: 1.4em;
  }

  p {
    margin: 5px 0;
    font-size: 1em;
  }

  blockquote {
    font-style: italic;
    color: var(--text-muted);
    margin-top: 10px;
  }

  .donate-image {
    margin-top: 20px;
    max-width: 100%;
    height: auto;
  }
</style>
