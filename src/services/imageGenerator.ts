export async function generateImage(prompt: string) {

  const create = await fetch("/api/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const prediction = await create.json();

  let status = prediction.status;
  let result = prediction;

  while (status !== "succeeded" && status !== "failed") {

    await new Promise(r => setTimeout(r, 2000));

    const res = await fetch(`/api/get-prediction?id=${prediction.id}`)
    result = await res.json();

    status = result.status;

  }

  if (status === "succeeded") {
    return result.output[0];
  }

  throw new Error("Image generation failed");

}
