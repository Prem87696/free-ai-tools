import React from "react";

/*
AUTO LOAD ALL TOOL COMPONENTS
*/

const modules = import.meta.glob("../components/tools/*.tsx", {
eager: true
});

export const toolEngine: Record<string, React.ComponentType<any>> = {};

for (const path in modules) {

const mod: any = modules[path];

const file = path.split("/").pop() || "";

const id = file
.replace(".tsx", "")
.replace(/[A-Z]/g, m => "-" + m.toLowerCase())
.replace(/^-/, "");

if(mod.default){

toolEngine[id] = mod.default;

}

}
