// eslint-disable-next-line no-shadow
enum EventKeys {
  USER_CREATED = 'user:created',
  USER_LOGGED_OUT = 'user:logout',

  FLOWER_CREATED = 'flower:created',
  FLOWER_UPDATED = 'flower:updated',
  FLOWER_DELETED = 'flower:deleted',

  BOUQUET_UPDATED = 'bouquet:updated',
  BOUQUET_DELETED = 'bouquet:deleted',
  BOUQUET_CREATED = 'bouquet:created',

  ORDER_CREATED = 'order:created',
  ORDER_COMPLETED = 'order:completed',
  ORDER_CANCELLED = 'order:cancelled',
  ORDER_SHOULD_CANCEL = 'order:expiretime',
}

export { EventKeys };
