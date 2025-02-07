├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── passport.ts
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   └── cart.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── product.routes.ts
│   │   │   └── order.routes.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── product.service.ts
│   │   │   └── stripe.service.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── errorHandler.ts
│   │   └── app.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   │   ├── integration/
│   │   └── unit/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── features/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── package.json
└── docker-compose.yml
