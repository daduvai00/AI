
module.exports.run = async function({
	api: e,
	event: a,
	Threads: t,
	getText: s
}) {
	const {
		threadID: n,
		messageID: o
	} = a;
	
	// এখানে resend সবসময় off হবে
	let d = (await t.getData(n)).data;
	d.resend = false; // সবসময় off রাখতে এখানে 'false' সেট করা হলো
	await t.setData(n, {
		data: d
	});
	global.data.threadData.set(n, d);
	e.sendMessage(`${d.resend ? s("on") : s("off")} ${s("successText")}`, n, o);
};
```

