import { h } from 'preact';

export function assign(obj, props) {
	for (let i in props) if (props.hasOwnProperty(i)) obj[i] = props[i];
	return obj;
}

export function getKey(vnode, fallback) {
	let key = vnode.attributes && vnode.attributes.key;
	return key===null || key===undefined ? fallback : key;
}
