<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite';

	let formError: string|null = null;

	async function handleSubmit(event: Event) {
		event.preventDefault();
		formError = null;

		const form =  event.target as HTMLFormElement;
		const formData = Object.fromEntries(new FormData(form).entries())

        const email = formData.email as string
        const password = formData.password as string
		if (!email || !password) {
			formError = 'Please fill out all fields';
			return;
		}

		try {
			await appwrite.account.createEmailSession(email, password);
			await invalidateAll();
		} catch (e) {
			formError = e.message;
		}
	}
</script>

<form on:submit={handleSubmit}>
	<label for="email">Email</label>
	<input type="email" id="email" name="email" required />
	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		placeholder="SuperSecretPassword"
		required
		minlength="8"
	/>
	<button type="submit">Login</button>
	{#if formError}
		<p>{formError}</p>
	{/if}
</form>
