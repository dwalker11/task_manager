# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :task_create, mutation: Mutations::TaskCreate
    field :task_complete, mutation: Mutations::TaskComplete
  end
end
