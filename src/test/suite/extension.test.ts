import * as assert from "assert";
import { before } from "mocha";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { extensions, window } from "vscode";
import { EXTENSION_ID } from "../../commonActivate";

suite("Extension Test Suite", () => {
	suiteSetup(async () => {
		// make sure extension is activated
		const ext = extensions.getExtension(EXTENSION_ID);
		if (ext) {
			await ext.activate();
		} else {
			assert.fail("Extension not found");
		}
	});

	before(() => {
		window.showInformationMessage("Start all tests.");
	});

	test("Extension started", () => {
		assert.ok("All good");
	});

});
