module Resolvers
    class TaskResolver < BaseResolver
        type Types::TaskType, null: false
        argument :id, ID

        def resolve(id:)
            ::Task.find(id)
        end
    end
end