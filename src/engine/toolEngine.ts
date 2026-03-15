 import React from "react";

/*
AUTO LOAD ALL TOOL COMPONENTS
*/

const modules = import.meta.glob("../components/tools/*.tsx", {
eager: true
});

export const toolEngine: Record<string, React.ComponentType<any>> = {};

for (const path in modules) {

const mod:any = modules[path];

const file = path.split("/").pop() || "";

/* FIX TOOL ID */

const id = file
.replace(".tsx","")
.replace(/([a-z])([A-Z])/g,"$1-$2")
.replace(/([A-Z])([A-Z][a-z])/g,"$1-$2")
.toLowerCase();

if(mod.default){

toolEngine[id] = mod.default;

}

}
