'use client'

import PageHeader from '../_components/PageHeader'

import { use, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import Issue from '../_components/Issue'
import { issue, useIssuesQuery } from '@/querys/use-issues.query'
import { useCreateIssueQueryMutation } from '@/querys/use-create-issue-query-mutation.mutation'

const IssuesPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [issueName, setIssueName] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const { data, isLoading, isError } = useIssuesQuery()
  const createIssueMutation = useCreateIssueQueryMutation()
  const issues: issue[] = data?.issues || []

  const onCreate = async (close: () => void) => {
    console.log('🐙 => ')
    await createIssueMutation.mutateAsync({
      input: {
        content: issueDescription,
        name: issueName,
        status: 'TODO',
      },
    })
    closeModalAndResetNameAndDescription()
  }

  const closeModalAndResetNameAndDescription = () => {
    setIssueName('')
    setIssueDescription('')
    onOpenChange(false)
  }

  return (
    <div>
      <PageHeader title="All issues">
        <Tooltip content="New Issue">
          <button
            className="text-white bg-black p-1 rounded-md"
            onClick={onOpen}
          >
            <PlusIcon size={14} />
          </button>
        </Tooltip>
      </PageHeader>
      {isLoading && <Spinner />}
      {isError && <div>Something went wrong</div>}
      {issues &&
        issues?.map((issue) => (
          <div key={issue.id}>
            <Issue issue={issue} />
          </div>
        ))}

      <Modal
        size="2xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-sm text-black/70">New issue</span>
              </ModalHeader>
              <ModalBody>
                <div>
                  <input
                    autoFocus
                    type="text"
                    className="w-full border-none outline-none focus:outline-none focus:border-none py-2 text-xl text-black/70"
                    placeholder="Issue name"
                    value={issueName}
                    onChange={(e) => setIssueName(e.target.value)}
                  />
                </div>
                <div className="bg-white">
                  <Textarea
                    size="lg"
                    variant="bordered"
                    placeholder="Issue description"
                    className="bg-white"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    classNames={{
                      inputWrapper: 'bg-white border-none shadow-none p-0',
                      base: 'bg-white p-0',
                      input: 'bg-white p-0',
                      innerWrapper: 'bg-white p-0',
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="border-t">
                <Button
                  variant="ghost"
                  onPress={() => closeModalAndResetNameAndDescription()}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  className="bg-black text-white"
                  onPress={() => onCreate(onClose)}
                >
                  Create Issue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default IssuesPage
