<script context="module">
  import { customFetch } from "../../../tools/auth";
  import config from "../../../tools/config";

  export async function preload(page, session) {
    const { userId } = page.params;
    const [profile, avatar, attendance, progress, progress_bar, audit_ratio] = await Promise.all([
      customFetch(`${config.API_URL}/user/${userId}`, {}, this.fetch).then(
        data => data.json()
      ),
      customFetch(
        `${config.API_URL}/user/${userId}/avatar`,
        {},
        this.fetch
      ).then(data => data.json()),
      customFetch(
        `${config.API_URL}/user/${userId}/attendance`,
        {},
        this.fetch
      ).then(data => data.json()),
      customFetch(
        `${config.API_URL}/user/${userId}/progress`,
        {},
        this.fetch
      ).then(data => data.json()),
      customFetch(
        `${config.API_URL}/user/${userId}/progress_bar`,
        {},
        this.fetch
      ).then(data => data.json()),
      customFetch(
        `${config.API_URL}/user/${userId}/audit_ratio`,
        {},
        this.fetch
      ).then(data => data.json())
    ]);
    return { id: userId, profile, avatar, attendance, progress, progress_bar, audit_ratio };
  }
</script>

<script>
  import Loading from "../../../components/Loading.svelte";
  import Profile from "../../../components/User/Profile.svelte";
  import Projects from "../../../components/User/Projects.svelte";
  import Attendance from "../../../components/User/Attendance.svelte";
  import ProgressBar from "../../../components/User/ProgressBar.svelte";
  import AuditRatio from "../../../components/User/AuditRatio.svelte";

  export let id;
  export let profile;
  export let avatar;
  export let attendance;
  export let progress;
  export let progress_bar;
  export let audit_ratio;
</script>

<style>
  p {
    margin: 0;
  }

  .profile-header {
    display: flex;
  }

  .profile-header img {
    height: 10rem;
    border-radius: 5px;
  }

  .profile-header > div {
    margin: 0 20px 0 0;
  }

  .profile-header > div:last-child {
    margin-right: 0;
  }

  .legend {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
  }

  .in {
    background-color: #2ecc71;
  }

  .out {
    background-color: #de8178;
  }

  .projects table {
    clear: both;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 3px;
    border-collapse: collapse;
    color: #444;
  }
  .projects td {
    text-align: left;
    padding: 3px 1rem;
    vertical-align: middle;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .calendar-wrapper {
    width: 100%;
    margin: 0em auto;
  }
  :global(table.calendar) {
    clear: both;
    width: 100%;
    border: 1px solid #dcdcff;
    border-radius: 3px;
    border-collapse: collapse;
    color: #444;
  }
  :global(.calendar td) {
    height: 48px;
    text-align: center;
    vertical-align: middle;
    border-right: 1px solid #dcdcff;
    border-top: 1px solid #dcdcff;
    width: 14.28571429%;
  }
  :global(.calendar td.not-current) {
    color: #c0c0c0;
  }
  :global(td.today) {
    font-weight: 700;
    color: #28283b;
    font-size: 1em;
  }
  :global(.calendar thead td) {
    border: none;
    color: #28283b;
    text-transform: uppercase;
    font-size: 1em;
  }
  #btnPrev {
    float: left;
    margin-bottom: 20px;
  }
  #btnNext {
    float: right;
    margin-bottom: 20px;
  }
  #btnPrev,
  #btnNext {
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: #c0c0c0;
    cursor: pointer;
    font-family: "Roboto Condensed", sans-serif;
    text-transform: uppercase;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  #btnPrev:hover,
  #btnNext:hover {
    color: #28283b;
    font-weight: bold;
  }

  /* Tooltip container */
  :global(.tooltip) {
    position: relative;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  :global(.tooltip .tooltiptext) {
    visibility: hidden;
    width: 60px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    bottom: 100%;
    left: 0%;
    margin-left: -10px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  :global(.tooltip:hover .tooltiptext) {
    visibility: visible;
  }

  :global(.tooltiptext:hover) {
    visibility: hidden;
  }
</style>

<svelte:head>
  <title>{profile.github_login} | dashboard</title>
</svelte:head>

<section>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <Profile {profile} {progress} {avatar} />
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <AuditRatio {audit_ratio} />
            </article>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <Projects {progress} />
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <Attendance {attendance} />
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <ProgressBar {progress_bar} />
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
