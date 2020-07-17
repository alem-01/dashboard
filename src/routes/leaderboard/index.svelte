<script context="module">
  import { customFetch } from "../../tools/auth";
  import config from "../../tools/config";
  export async function preload(page, session) {
    const resp = await customFetch(`${config.API_URL}/leaderboard`, {}, this.fetch);
    const data = await resp.json();
    const students = data.users.map(user => {
      user._url_ = `/user/${user.id}`
      return user
    });
    return { students };
  }
</script>

<script>
  import { onMount } from "svelte";
  import Table from "../../components/Table.svelte";

  export let students = [];
  const maxXP = students.reduce(
    (acc, curr) => (curr.xp > acc ? curr.xp : acc),
    Number.NEGATIVE_INFINITY
  );

  const CellBackground = xp => {
    const grade = xp / maxXP;
    if (grade >= 0.8) return "hsl(185, 100%, 50%)";
    if (grade >= 0.6) return "hsl(170, 100%, 35%)";
    if (grade >= 0.4) return "hsl(60, 100%, 50%)";
    if (grade >= 0.2) return "hsl(35, 100%, 50%)";
    return "hsl(340, 100%, 60%)";
  };

  const columns = {
    githubLogin: 'Login',
    firstName: 'Name',
    lastName: 'Surname',
    xp: 'XP',
    audits: 'Audits',
    generation: 'Generation',
  }
</script>

<svelte:head>
  <title>leaderboard | dashboard</title>
</svelte:head>

<section>
  <div class="container">
    <Table
      bind:data={students}
      {columns}
      sortkey={'xp'}
      threshold={'xp'}
      colorCellFunction={CellBackground}/>
  </div>
</section>
