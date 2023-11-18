<script lang="ts">
  import TextFilter from "./../TextFilter.svelte";
  import { Input } from "$lib/components/ui/input";
  import * as Popover from "$lib/components/ui/popover";
  import { PlusCircled, Check } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Command from "$lib/components/ui/command";

  let selectedUnidade: string;
  let qU: string;

  function filterByQuery(items: string[], query: string): string[] {
    return query
      ? items.filter((item) =>
          item?.toUpperCase().includes(query.toUpperCase())
        )
      : items;
  }

  export let data;

  $: unidades = filterByQuery(data.props.pdms, qU)?.slice(0, 6);
  $: qU ? console.log(qU) : false;

  let open = false;
  function runCommand(cmd: () => void) {
    open = false;
    cmd();
  }
</script>

<div class="flex flex-1 items-center space-x-2 align-middle">
  <Input
    type="text"
    placeholder="Código BR"
    class="w-24 placeholder:not-italic"
  />
  <Input
    type="text"
    placeholder="Descrição do Material"
    class="w-1/2 placeholder:not-italic"
  />
  <Input
    type="text"
    placeholder="Unidade de Fornecimento"
    class="w-32 lg:w-60 placeholder:not-italic"
  />

  <Popover.Root>
    <Popover.Trigger>
      <Button variant="outline" size="sm" class="h-8">
        <PlusCircled class="mr-2 h-4 w-4" />
        Unidade
      </Button>
    </Popover.Trigger>
    <Popover.Content>
      <Command.Root>
        <Command.Input
          bind:value={qU}
          placeholder="Busque Classe..."
          class="non-italic"
        />

        <Command.List>
          <Command.Empty>Nenhum resultado encontrado.</Command.Empty>
          {#each unidades as unidade}
            <Command.Item
              value={unidade}
              onSelect={() => {
                runCommand(() => {
                  selectedUnidade = unidade;
                });
              }}>{unidade}</Command.Item
            >
          {/each}
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
</div>
<h3>(selected: {selectedUnidade}, qU: {qU})</h3>
