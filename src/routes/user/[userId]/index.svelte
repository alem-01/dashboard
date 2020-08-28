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
        {cache: 'force-cache'},
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

  .in {
    background-color: #2ecc71;
  }

  .out {
    background-color: #de8178;
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

 
</style>

<svelte:head>
  <title>{profile.github_login} | dashboard</title>
</svelte:head>

<section>
  <Profile {profile} {progress} {avatar} />
  <div class="columns">
    <div class="column is-3">
      <Attendance {attendance} />
      <!-- <AuditRatio {audit_ratio} /> -->
    </div>
    <div class="column">
      <Projects {progress} />
    </div>
  </div>
</section>

<!-- <section>
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
</section> -->
