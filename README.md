## Snarkaup

Frontend:

- Next.js
- Typescript
- Tailwind
- DatoCMS

Backend:
Built in collaboration with [Andri Rafn](https://github.com/AndriRafnR) 🤝

- [Vercel's Postgres solution](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma](https://www.prisma.io)

This [design](<https://www.figma.com/file/S2qa5zFljHDDKLOdP50Dpo/3legant-E-Commerce-UI-Design-Template-(Community)?node-id=3%3A674&mode=dev>) was used as blueprint/ guideline

---

# How to add a new content model with Dato:

_If model has images you can use ImageFragment to query (dato/fragments)._

1. Create new query file under dato/queries after testing query in Dato sandbox
2. Run codegen
