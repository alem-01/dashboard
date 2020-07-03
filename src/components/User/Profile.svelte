<script>
  import config from "../../tools/config";
  export let profile;
  export let progress;
  export let avatar;

  const presence = "";

  const toSize = size => {
    const e = (Math.log(size) / Math.log(1024)) | 0;
    const unit = "KMGTPEZY"[e - 1] || "";
    const num = size / Math.pow(1024, e);
    const round = Math.round(num);
    return `${round > 100 ? round : num.toFixed(round > 10 ? 1 : 2)}${unit}B`;
  };
</script>

<style>
  p {
    margin: 0.5rem 0;
  }
</style>

<div class="columns">
  <div class="column is-one-quarter">
    <img
      src="data:image/png;base64, {avatar.image}"
      alt={profile.profile.github_login} />
  </div>
  <div class="column">
    <h1>
      <span class="legend {presence}" />
      {profile.profile.first_name}
      <strong>"{profile.profile.github_login}"</strong>
      {profile.profile.last_name}
    </h1>

    <div class="info">
      <p>
        <span class="tag is-light">
          <i class="fas fa-phone" />
          {profile.profile.tel}
        </span>
      </p>
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <span class="tag">
              {toSize(progress.progress.xp.aggregate.sum.amount)}
            </span>
            <span class="tag is-dark">xp</span>
          </div>
        </div>

        <div class="control">
          <div class="tags has-addons">
            <span class="tag">{progress.progress.audits.aggregate.count}</span>
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
