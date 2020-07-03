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
        {piscine.user.github_login} | dashboard
    </title>
</svelte:head>


<section>
    <div class="container">
        <h2 class="h2-big">{piscine.user.first_name} <strong>"{piscine.user.github_login}"</strong> {piscine.user.last_name}</h2>
        <div class="tile is-ancestor">
            <div class="tile is-vertical">
                <div class="tile">
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <Toad toad={piscine.toad} />
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <Raids raids={piscine.raid_notes} />
                        </article>
                    </div>
                </div>
                <div class="tile">
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <Exams exams={piscine.exams} events={piscine.exam_events}/>
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <Quests quests={piscine.quests} />
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
