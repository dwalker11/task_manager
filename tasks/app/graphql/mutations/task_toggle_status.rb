# frozen_string_literal: true

module Mutations
  class TaskToggleStatus < BaseMutation
    description "Toggle task completion status"

    field :task, Types::TaskType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      task = ::Task.find(id)
      task.completed = !task.completed
      raise GraphQL::ExecutionError.new "Error updating task", extensions: task.errors.to_hash unless task.save

      { task: task }
    end
  end
end
