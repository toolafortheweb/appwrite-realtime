<script lang=ts>
	import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite';
	import { ID } from 'appwrite';

	let formError = null;

	async function handleSubmit(event) {
		event.preventDefault();
		formError = null;

		const form = event.target as HTMLFormElement;
		const formData = Object.fromEntries(new FormData(form).entries())

        const name = formData.name as string
        const email = formData.email as string
        const password = formData.password as string
		if (!name || !email || !password) {
			formError = 'Please fill out all fields';
			return;
		}

		try {
			await appwrite.account.create(ID.unique(), email, password, name);
			await appwrite.account.createEmailSession(email, password);
			await invalidateAll();
		} catch (e) {
			formError = e.message;
		}
	}
</script>

<form on:submit={handleSubmit}>
	<label for="name">Name</label>
	<input type="text" id="name" name="name" required />
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
	<button type="submit">Signup</button>
	{#if formError}
		<p>{formError}</p>
	{/if}
</form>
