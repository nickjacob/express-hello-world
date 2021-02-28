const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const isPresent = (str) => str != null && str.length > 0;

function normalizeUrl(url) {
  return 'https://' + url.trim().toLowerCase().replace(/^https?:\/\//, '');
}

app.get("/l", (req, res) => {
  const url = req.query.u;
  if (url == null || url.length === 0) {
    return res.redirect("https://herboldmove.org?utm_source=404");
  }

  const uri = new URL(normalizeUrl(url));
  if (!isPresent(uri.searchParams.get("utm_source"))) {
    uri.searchParams.append("utm_source", "redir");
  }

  if (isPresent(req.query.amount)) {
    uri.searchParams.append("amount", req.query.amount);
  }

  return res.redirect(uri.toString())
});

app.get("*", (_req, res) => {
  return res.redirect("https://herboldmove.org?utm_source=redir&utm_campaign=nf")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
