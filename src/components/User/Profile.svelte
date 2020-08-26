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
</style>

<div class="columns">
  <div class="column is-one-quarter">
    {#if avatar}
    <img
      src="data:image/png;base64, {avatar.image}"
      alt={profile.github_login} />
    {/if}
  </div>
  <div class="column">
    <h1>
      <span class="legend {presence}" />
      {profile.first_name}
      <strong>"{profile.github_login}"</strong>
      {profile.last_name}
    </h1>

    <div class="info">
      <p>
        <span class="tag is-light">
          <i class="fas fa-phone" />
          {profile.tel}
        </span>
      </p>
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <span class="tag">
              {toSize(progress.xp.aggregate.sum.amount)}
            </span>
            <span class="tag is-dark">xp</span>
          </div>
        </div>

        <div class="control">
          <div class="tags has-addons">
            <span class="tag">{progress.audits.aggregate.count}</span>
            <span class="tag is-dark">audits</span>
          </div>
        </div>
      </div>

      <p>
        <a
          class="button is-light"
          href={`${config.URL}/user/${profile.id}/piscine`}>
          piscine
        </a>
      </p>
    </div>
  </div>
</div>
