# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :task_create, mutation: Mutations::TaskCreate
    field :task_toggle_status, mutation: Mutations::TaskToggleStatus
  end
end
