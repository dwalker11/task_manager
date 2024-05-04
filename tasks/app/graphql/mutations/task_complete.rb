# frozen_string_literal: true

module Mutations
  class TaskComplete < BaseMutation
    description "Marks task as complete"

    field :task, Types::TaskType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      task = ::Task.find(id)
      task.completed = true
      raise GraphQL::ExecutionError.new "Error updating task", extensions: task.errors.to_hash unless task.save

      { task: task }
    end
  end
end
