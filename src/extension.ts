// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('hello');
	const gitExtension = vscode.extensions.getExtension('vscode.git');

	if (!gitExtension) {
			console.error("Git extension not found!");
			return;
	}
	else{
		console.log("Git extension  found!");
	}

	const gitAPI = gitExtension.exports.getAPI(1);

    // 리포지토리 배열을 가져옵니다.
	const repos = gitAPI.repositories;

    // 모든 리포지토리에 대해 이벤트 리스너를 설정합니다.
	repos.forEach( (repo:any) => {
			repo.onDidChangeStatus(() => {
					console.log(`Status changed for ${repo.rootUri}`);
					// 여기서 상태 변경에 대한 처리 로직을 추가합니다.
			});
	});

	// 첫 로드 시 상태 출력
	repos.forEach( (repo:any) => {
		console.log(repo.state);
	});

	const disposable = vscode.commands.registerCommand('gittest.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from gittest!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
