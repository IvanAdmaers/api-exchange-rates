const request = async (url = '') => {
  const req = await fetch(url);
  const res = await req.json();

  return res;
};

const getHTMLCode = (text = '') => `
<pre class="bg-light">
  <code>${text}</code>
</pre>
`;

const liveRequest = (selector = '') => {
  const examples = document.querySelectorAll(selector);

  examples.forEach((example) => {
    const url = example.querySelector('a').href;
    const button = example.querySelector('button');
    const liveExample = example.querySelector('.live-example');

    button.addEventListener('click', async () => {
      button.disabled = true;

      const response = await request(url);

      const code = JSON.stringify(response, null, 4);

      liveExample.textContent = '';
      liveExample.insertAdjacentHTML('beforeend', getHTMLCode(code));

      button.disabled = false;
    });
  });
};

export default liveRequest;
