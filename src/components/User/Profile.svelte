<script>
  import config from "../../tools/config";
  import { toSize } from "./user";
  export let profile;
  export let progress;
  export let avatar;
  const presence = "";
</script>

<style>
  p {
    margin: 0.5rem 0;
  }
  .student-avatar {
    object-fit: cover;
    width: 7rem;
    height: 7rem;
    border-radius: 100%;
    
  }
  .student-name {
    font-size: 1.5rem;
    font-weight: 500;
  }
</style>

<div class="columns is-vcentered is-mobile">
  <div class="column is-2">
    {#if avatar}
    <img
      src="data:image/png;base64, {avatar.image}"
      alt={profile.github_login} 
      class="student-avatar box-shadow" />
    {/if}
  </div>
  <div class="column">
    <div class="columns is-mobile">
      <div class="column">
        <h1 class="student-name">
          <span class="legend {presence}" />
          {profile.first_name}
          {profile.last_name}
        </h1>
        <h2>
          <i class="fas fa-angle-right"></i>&nbsp;
          {profile.github_login}&nbsp;
          <span class="tag is-light">
            <i class="fas fa-phone" />&nbsp;
            {profile.tel}
          </span>
        </h2>
      </div>
      <div class="column is-one-third">
        <div class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">XP</p>
              <p>{toSize(progress.xp.aggregate.sum.amount)}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Audits</p>
              <p>{progress.audits.aggregate.count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
