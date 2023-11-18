 <script lang="ts">
  // import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  // import * as Select from "$lib/components/ui/select";
  // import { Input } from "$lib/components/ui/input";
  // import { Label } from "$lib/components/ui/label";

  import type { PageData } from "./$types";
  import MaterialTable from "./MaterialTable.svelte";

  // export const data:
  export let data: PageData;
  // $: if (data) {console.log(data.feed)}
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title tag="h3">Selecionar Material e Unidade</Card.Title>
    <Card.Description
      >Esclha o material que quer comprar e a unidade de fornecimento desejada
      para fazer pesquisa de preços.</Card.Description
    >
  </Card.Header>
  <Card.Content>
    {#if data.feed}

    <MaterialTable rows={data.feed} />
  {/if}

  </Card.Content>

 </Card.Root>
