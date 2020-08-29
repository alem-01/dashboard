<script context="module">
    import { customFetch } from "../../../tools/auth"
    import config from "../../../tools/config";

    export async function preload(page, session) {
        const { userId } = page.params
        const [piscine] = await Promise.all([
            customFetch(`${config.API_URL}/user/${userId}/piscine`, {}, this.fetch).then(data => data.json()),
        ])
        return { id: userId, piscine}
  }
</script>

<script>
    import {onMount} from 'svelte';
    import Toad from "../../../components/User/Piscine/Toad.svelte"
    import Quests from "../../../components/User/Piscine/Quests.svelte"
    import Exams from "../../../components/User/Piscine/Exams.svelte"
    import Raids from "../../../components/User/Piscine/Raids.svelte"

    export let id
    export let piscine
</script>

<style>
    .h2-big {
        margin: 0.5rem 0 0.5rem 0;
        font-weight: 400;
        line-height: 1.2;
        font-size: 1.5rem;
    }
</style>

<svelte:head>
    <title>
        {piscine.user.github_login} piscine | dashboard
    </title>
</svelte:head>


<section>
    <div class="columns is-mobile">
      <div class="column">
        <h1 class="student-name">
          {piscine.user.first_name}
          {piscine.user.last_name}
        </h1>
        <h2>
          <i class="fas fa-angle-right"></i>&nbsp;
          {piscine.user.github_login}&nbsp;
        </h2>
      </div>
    </div>
  <div class="columns">
    <div class="column is-3">
      <Toad toad={piscine.toad} />
      <a class="button button-01 ba-01" href="/user/{piscine.user.github_login}" style="width: 100%;">Profile</a>
    </div>
    <div class="column">
        <Raids raids={piscine.raid_notes} />
        <div class="columns">
            <div class="column"><Exams exams={piscine.exams} events={piscine.exam_events}/></div>
            <div class="column"><Quests quests={piscine.quests} /></div>
        </div>
    </div>
  </div>
</section>
