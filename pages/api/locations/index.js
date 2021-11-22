// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
        "name": "NantHealth",
        "location": "Philadelphia",
        "state": "PA",
        "zipcode": "19103",
        "stocksymbol": "NH",
        "CEO": "Patrick Soon-Shiong"
    },
    {
        "name": "Microsoft",
        "location": "Redmond",
        "state": "WS",
        "zipcode": "98003",
        "stocksymbol": "MSFT",
        "CEO": "Satya Nadella"
    },
    {
        "name": "Google",
        "location": "Mountain View",
        "state": "CA",
        "zipcode": "94043",
        "stocksymbol": "GOOG",
        "CEO": "Sundar Pichai"
    },
    {
        "name": "Apple",
        "location": "Cupertino",
        "state": "CA",
        "zipcode": "94080",
        "stocksymbol": "AAPL",
        "CEO": "Timothy D. Cook"
    },
    {
        "name": "Netflix",
        "location": "Los Gatos",
        "state": "CA",
        "zipcode": "95032",
        "stocksymbol": "NFLX",
        "CEO": "Wilmot Reed Hastings Jr."
    },
    {
        "name": "Facebook",
        "location": "Menlo Park",
        "state": "CA",
        "zipcode": "94025",
        "stocksymbol": "FB",
        "CEO": "Mark Elliot Zuckerberg"
    }
  ])
}
