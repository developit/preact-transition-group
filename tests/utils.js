/**
 * Setup the test environment
 * @returns {HTMLDivElement}
 */
export function setupScratch() {
	const scratch = document.createElement('div');
	(document.body || document.documentElement).appendChild(scratch);
	return scratch;
}

/**
 * Teardown test environment and reset preact's internal state
 * @param {HTMLDivElement} scratch
 */
export function teardown(scratch) {
	scratch.parentNode.removeChild(scratch);
}

export function setupCustomMatchers() {
	jasmine.addMatchers({
		toHaveLength: () => ({
			compare(actualArray, expectedLength) {
				if (!actualArray || typeof actualArray.length !== 'number') {
					throw new Error(
						'[.not].toHaveLength expected actual value to have a ' +
						'"length" property that is a number. Recieved: ' +
						actualArray
					);
				}

				const actualLength = actualArray.length;
				const pass = actualArray.length === expectedLength;

				const message = !pass
					? // Error message for `.toHaveLength` case
					`Expected actual value to have length ${expectedLength} but got ${actualLength}`
					: // Error message for `.not.toHaveLength` case
					`Expected actual value to not have length ${expectedLength} but got ${actualLength}`;

				return { pass, message };
			}
		})
	});
}
