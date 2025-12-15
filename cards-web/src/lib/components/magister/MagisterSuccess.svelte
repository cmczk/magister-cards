<script lang="ts">
	let { message } = $props();
</script>

<p class="magister-success">
	{message}
</p>

<style>
	.magister-success {
		background-color: var(--bs-success);
		color: white;
		max-width: 500px;
		padding: 10px;
	}
</style>
