<script>
  let users = [
    {
      pfp: 'https://placehold.co/400',
      name: 'Alice',
      discord: 'alice#1234',
      pronouns: '(she/her)',
      quote: 'I like baguette.'
    },
    {
      pfp: 'https://placehold.co/400',
      name: 'Bob',
      discord: 'bob#5678',
      pronouns: '(he/him)',
      quote: 'I Like chees.'
    },
    {
      pfp: 'https://placehold.co/400',
      name: 'Charlie',
      discord: 'charlie#9101',
      pronouns: '(they/them)',
      quote: 'gender is a mere social construct'
    }
  ];
</script>

<div class="main-container">
  <div class="title-container">
    <h1>Meet the team!</h1>
  </div>
  <div class="users-container">
    {#each users as user}
      <div class="user-card">
        <img src={user.pfp} alt="{user.name}'s profile picture" class="pfp" />
        <h2>{user.name}</h2>
        <p>{user.discord} {user.pronouns}</p>
        <blockquote>{user.quote}</blockquote>
      </div>
    {/each}
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

  .users-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    width: 80%;
  }

  .user-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 15px;
    background-color: light-dark(var(--card-light), var(--card-dark));
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .pfp {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }

  h2 {
    margin: 5px 0;
    font-size: 1.2em;
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
</style>
