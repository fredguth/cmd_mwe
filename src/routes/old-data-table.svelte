<script lang="ts">
	import { CaretSort } from 'radix-icons-svelte';

  import {
    createTable,
    Render,
    Subscribe,
    createRender,
  } from "svelte-headless-table";
  import { addColumnFilters } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import TextFilter from './TextFilter.svelte';

  export let rows;
  const table = createTable(readable(rows), { filter: addColumnFilters() });
  const textPrefixFilter = ({ filterValue, value }) => {
  return String(value)
    .toUpperCase()
    .startsWith(String(filterValue).toUpperCase());
};
  const columns = table.createColumns([
    // table.column({
    //   accessor: 'ID_MATERIAL',
    //   header: 'ID'
    // }),
    table.column({
      accessor: "CODIGOBR",
      header: "Código BR",
      plugins: {
        filter: {
          fn: textPrefixFilter,
          initialFilterValue: "",
          render: ({ filterValue, values, preFilteredValues }) =>
            createRender(TextFilter, {
              filterValue,
              values,
              preFilteredValues,
            }),
        },
      },
    }),
    table.column({
      accessor: "DS_CLASSE",
      header: "Classe",
      plugins: {
        filter: {
          fn: textPrefixFilter,
          initialFilterValue: "",
          render: ({ filterValue, values, preFilteredValues }) =>
            createRender(TextFilter, {
              filterValue,
              values,
              preFilteredValues,
            }),
        },
      },
    }),
    table.column({
      accessor: "PDM",
      header: "PDM",
      plugins: {
        filter: {
          fn: textPrefixFilter,
          initialFilterValue: "",
          render: ({ filterValue, values, preFilteredValues }) =>
            createRender(TextFilter, {
              filterValue,
              values,
              preFilteredValues,
            }),
        },
      },
    }),
    table.column({
      accessor: "DS_MATERIAL",
      header: "Descrição",
      plugins: {
        filter: {
          fn: textPrefixFilter,
          initialFilterValue: "",
          render: ({ filterValue, values, preFilteredValues }) =>
            createRender(TextFilter, {
              filterValue,
              values,
              preFilteredValues,
            }),
        },
      },
    }),
    table.column({
      accessor: "DS_UNIDADE",
      header: "Unidade",
      plugins: {
        filter: {
          fn: textPrefixFilter,
          initialFilterValue: "",
          render: ({ filterValue, values, preFilteredValues }) =>
            createRender(TextFilter, {
              filterValue,
              values,
              preFilteredValues,
            }),
        },
      },
    }),
    // table.column({
    //   accessor: ({ id }) => id,
    //   header: ''
    // })
  ]);
  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns);
</script>
<div class="rounded-md border">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
                  <Render of={cell.render()} />
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
  <!-- <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe
                attrs={cell.attrs()}
                let:attrs
                props={cell.props()}
                let:props
              >
                <Table.Head
                  {...attrs}
                  class={cn(
                    "[&:has([role=checkbox])]:pl-3"
                  )}
                >
                  {#if props.sort.disabled}
                    <Render of={cell.render()} />
                  {:else}
                    <Button
                      variant="ghost"
                      on:click={props.sort.toggle}
                    >
                      <Render of={cell.render()} />
                      <CaretSort
                        class={cn(
                          $sortKeys[0]?.id ===
                            cell.id &&
                            "text-foreground",
                          "ml-2 h-4 w-4"
                        )}
                      />
                    </Button>
                  {/if}
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row
            {...rowAttrs}
            data-state={$selectedDataIds[row.id] && "selected"}
          >
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell
                  class="[&:has([role=checkbox])]:pl-3"
                  {...attrs}
                >
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root> -->
</div>
<!-- <div class="rounded-md border"></div> -->
<!-- <table {...$tableAttrs}>
	<thead>
		{#each $headerRows as headerRow (headerRow.id)}
			<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
				<tr {...rowAttrs}>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<th {...attrs}>
								<Render of={cell.render()} />
								{#if props.filter?.render}
								<div>
									<Render of={props.filter.render} />
								</div>
								{/if}
							</th>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</thead>
	<tbody {...$tableBodyAttrs}>
		{#each $rows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<tr {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<td><Render of={cell.render()} /></td>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table> -->
<!--
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
                  <Render of={cell.render()} />
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div> -->
