<script context="module">
  import { customFetch } from "../../tools/auth";
  import { toSize } from "../../components/User/user";
  import config from "../../tools/config";

  const processStudents = students => {
    return students.map(user => {
      user._url_ = `/user/${user.githubLogin}`
      user.xp = parseInt(user.xp)
      if (isNaN(user.xp)) {
        user.xp = 0
      }
      user.progress = user.xp
      user.color = user.xp

      user.down = parseInt(user.down)
      user.up = parseInt(user.up)
      user.audit_ratio = Math.round((user.up) / (user.down) * 100 * 100) / 100
      if (isNaN(user.audit_ratio)) {
        user.audit_ratio = 0
      }
      return user
    });
  }

  export async function preload(page, session) {
    const resp = await customFetch(`${config.API_URL}/leaderboard`, {}, this.fetch);
    const data = await resp.json();
    const students = processStudents(data.users)
    return { students };
  }
</script>

<script>
  import { onMount } from "svelte";
  import Table from "../../components/Table.svelte";

  export let students = [];
  export let generations = [];

  let maxXP = students.reduce(
      (acc, curr) => (curr.xp > acc ? curr.xp : acc),
      Number.NEGATIVE_INFINITY
  );

  const columns = {
    githubLogin: 'Login',
    progress: {
      title: 'Progress',
      render: val => `<progress class="progress is-primary" value="${val}" max="${maxXP}">${val}%</progress>`
    },
    xp: {
      title: 'XP',
      render: val => toSize(val)
    },
    color: {
      title: '',
      render: val => `<span style="background-color: ${cellBackground(val)}; border-radius: 100%; width: 10px; height: 10px; display: inline-block"></span>`
    }
  }

  const fetchLeaderboard = async (cursus) => {
    const resp = await customFetch(`${config.API_URL}/leaderboard?cursus=${cursus}`, {}, fetch);
    const data = await resp.json();
    const tmp = processStudents(data.users)
    students = tmp
    maxXP = students.reduce(
        (acc, curr) => (curr.xp > acc ? curr.xp : acc),
        Number.NEGATIVE_INFINITY
    );
  }

  const makeGenerations = () => {
    generations = students.map(a => a.generation).filter((value, index, self) => self.indexOf(value) === index)
  }
  
  const cellBackground = xp => {
    const grade = xp / maxXP;
    if (grade >= 0.8) return "hsl(185, 100%, 50%)";
    if (grade >= 0.6) return "hsl(170, 100%, 35%)";
    if (grade >= 0.4) return "hsl(60, 100%, 50%)";
    if (grade >= 0.2) return "hsl(35, 100%, 50%)";
    return "hsl(340, 100%, 60%)";
  };

  $: if (students) {
    makeGenerations();
  }
</script>

<svelte:head>
  <title>leaderboard | dashboard</title>
</svelte:head>

<section>
  <div class="container">
    <h3 class="chapter-header">Cursus</h3>
    <div class="field is-horizontal">
      <div class="buttons">
        <button class="button button-01 ba-01" on:click="{() => fetchLeaderboard('Div 01')}">Div 01</button>
        <button class="button button-01 ba-01" on:click="{() => fetchLeaderboard('Piscine Go')}">Piscine Go</button>
        <button class="button button-01 ba-01" on:click="{() => fetchLeaderboard('Piscine JS')}">Piscine JS</button>
      </div>
    </div>

    <Table
      bind:data={students}
      {generations}
      {columns}
      sortkey={'xp'}
      threshold={'xp'}/>
  </div>
</section>
