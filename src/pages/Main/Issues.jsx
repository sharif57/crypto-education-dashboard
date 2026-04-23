import { useState } from "react";
import { Button, Input, Modal, Space, Table, Tag, message } from "antd";
import { FiImage, FiRefreshCw, FiSearch, FiShield, FiUser, FiX } from "react-icons/fi";
import { useIssueListQuery, useUpdateIssueStatusMutation } from "../../redux/features/issueSlice";

const STATUS_STYLES = {
  open: "bg-amber-100 text-amber-700 border-amber-200",
  in_progress: "bg-sky-100 text-sky-700 border-sky-200",
  resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-slate-100 text-slate-700 border-slate-200",
};

const formatStatusLabel = (status) => {
  if (!status) return "Pending";
  return status.replaceAll("_", " ");
};

const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  return `https://api.theclue.io${imagePath}`;
};

export default function Issues() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingActionKey, setUpdatingActionKey] = useState("");
  const [updateIssueStatus, { isLoading: isUpdating }] = useUpdateIssueStatusMutation();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useIssueListQuery();

  const issues = Array.isArray(data)
    ? data
    : data?.results || data?.data || data?.items || [];

  const normalizedIssues = issues.map((issue) => ({
    ...issue,
    status: (issue?.status || "open").toLowerCase(),
  }));

  const filteredIssues = normalizedIssues.filter((issue) => {
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const searchValue = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !searchValue ||
      issue.email?.toLowerCase().includes(searchValue) ||
      issue.description?.toLowerCase().includes(searchValue) ||
      issue.object_id?.toLowerCase().includes(searchValue);

    return matchesStatus && matchesSearch;
  });

  const issueCounts = normalizedIssues.reduce(
    (accumulator, issue) => {
      accumulator.total += 1;
      accumulator[issue.status] = (accumulator[issue.status] || 0) + 1;
      return accumulator;
    },
    { total: 0, open: 0, in_progress: 0, resolved: 0 }
  );

  const handleUpdateStatus = async (issue, nextStatus) => {
    const actionKey = `${issue.object_id}-${nextStatus}`;

    try {
      setUpdatingActionKey(actionKey);
      await updateIssueStatus({ id: issue.object_id, status: nextStatus }).unwrap();
      message.success(`Issue marked as ${nextStatus}.`);

      if (selectedIssue?.object_id === issue.object_id) {
        setSelectedIssue({ ...issue, status: nextStatus });
      }
    } catch (error) {
      message.error(error?.data?.detail || "Failed to update the issue status.");
    } finally {
      setUpdatingActionKey("");
    }
  };

  const columns = [
    {
      title: "Issue",
      key: "issue",
      render: (_, issue) => (
        <div className="space-y-1">
          <div className="font-semibold text-[#0F172A]">{issue.object_id}</div>
          <div className="text-xs text-slate-500 break-all">{issue.email}</div>
        </div>
      ),
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (description) => (
    //     <div className="max-w-[320px] text-sm text-slate-700 line-clamp-2">{description || "N/A"}</div>
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag className={`rounded-full px-3 py-1 capitalize ${STATUS_STYLES[status] || STATUS_STYLES.pending}`}>
          {formatStatusLabel(status || "pending")}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt) => <span className="text-sm text-slate-600">{formatDateTime(createdAt)}</span>,
    },
    {
      title: "Attachments",
      key: "attachments",
      render: (_, issue) => (
        <div className="flex items-center gap-2 text-slate-600">
          <FiImage className="text-[#4F46E5]" />
          <span>{issue?.images?.length || 0} file(s)</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, issue) => (
        <Space size={8} wrap>
          <Button
            onClick={() => setSelectedIssue(issue)}
            className="rounded-xl border-[#CBD5E1] text-[#0F172A]"
            disabled={isFetching}
          >
            Details
          </Button>
          <Button
            loading={updatingActionKey === `${issue.object_id}-in_progress`}
            disabled={issue.status === "in_progress" || isUpdating}
            onClick={() => handleUpdateStatus(issue, "in_progress")}
            className="rounded-xl border-sky-200 text-sky-700"
          >
            In Progress
          </Button>
          <Button
            loading={updatingActionKey === `${issue.object_id}-resolved`}
            disabled={issue.status === "resolved" || isUpdating}
            onClick={() => handleUpdateStatus(issue, "resolved")}
            className="rounded-xl border-[#BBF7D0] text-[#15803D]"
          >
            Resolve
          </Button>
        </Space>
      ),
    },
  ];

  if (isError) {
    return (
      <div className="rounded-[28px] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
          <div className="rounded-full bg-rose-50 p-4 text-rose-500">
            <FiShield size={34} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Unable to load issues</h3>
            <p className="mt-2 text-slate-500">Check your connection and try fetching the list again.</p>
          </div>
          <Button type="primary" onClick={refetch} icon={<FiRefreshCw />} className="h-11 rounded-xl bg-[#0F766E]">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-[28px] bg-[#373737] p-4 md:p-6">
      <div className="rounded-[28px] border border-white/70 bg-gradient-to-r from-[#081120] via-[#0F172A] to-[#0B4A6F] px-6 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] md:px-8 md:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
              <FiShield />
              Support Issues
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Manage issue reports with fast status updates.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200 md:text-base">
                Review user reports, inspect attachments, and resolve or reopen issues directly from this screen.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:min-w-[560px]">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Total</p>
              <p className="mt-2 text-3xl font-bold">{issueCounts.total}</p>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-4 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-100">Open</p>
              <p className="mt-2 text-3xl font-bold">{issueCounts.open}</p>
            </div>
            <div className="rounded-2xl border border-sky-300/20 bg-sky-400/10 px-4 py-4 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-100">In Progress</p>
              <p className="mt-2 text-3xl font-bold">{issueCounts.in_progress}</p>
            </div>
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-4 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Resolved</p>
              <p className="mt-2 text-3xl font-bold">{issueCounts.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Issue inbox</h2>
            <p className="mt-1 text-sm text-slate-500">Search, filter, and update any issue without leaving the page.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              allowClear
              size="large"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              prefix={<FiSearch className="text-slate-400" />}
              placeholder="Search by email, issue ID, or description"
              className="w-full sm:w-[320px] rounded-xl"
            />
            <Button
              size="large"
              icon={<FiRefreshCw />}
              onClick={refetch}
              loading={isFetching}
              className="rounded-xl border-slate-200 text-slate-700"
            >
              Refresh
            </Button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { key: "all", label: "All Issues", count: issueCounts.total },
            { key: "open", label: "Open", count: issueCounts.open },
            { key: "in_progress", label: "In Progress", count: issueCounts.in_progress },
            { key: "resolved", label: "Resolved", count: issueCounts.resolved },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                statusFilter === item.key
                  ? "border-[#0F766E] bg-[#0F766E] text-white shadow-lg shadow-[#0F766E]/20"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              {item.label} <span className="ml-1 opacity-80">({item.count})</span>
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-100">
          <Table
            rowKey="object_id"
            columns={columns}
            dataSource={filteredIssues}
            loading={isLoading || isFetching}
            locale={{
              emptyText: isLoading || isFetching ? "Loading issues..." : "No issues found",
            }}
            pagination={{
              position: ["bottomCenter"],
              pageSize: 8,
              showSizeChanger: false,
            }}
            scroll={{ x: 1100 }}
          />
        </div>
      </div>

      <Modal
        open={Boolean(selectedIssue)}
        onCancel={() => setSelectedIssue(null)}
        footer={null}
        width={920}
        centered
        closeIcon={<FiX size={22} />}
        styles={{ body: { padding: 0 } }}
      >
        {selectedIssue ? (
          <div className="overflow-hidden rounded-3xl bg-white">
            <div className="bg-gradient-to-r from-[#081120] via-[#0F172A] to-[#0B4A6F] px-6 py-6 text-white md:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                    <FiUser />
                    Issue details
                  </div>
                  <h3 className="mt-4 text-2xl font-bold break-all">{selectedIssue.email}</h3>
                  <p className="mt-2 max-w-2xl text-sm text-slate-200">{selectedIssue.object_id}</p>
                </div>

                <Tag className={`self-start rounded-full px-4 py-1 capitalize ${STATUS_STYLES[selectedIssue.status] || STATUS_STYLES.pending}`}>
                  {formatStatusLabel(selectedIssue.status)}
                </Tag>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[1.3fr_0.9fr] md:p-8">
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-lg font-semibold text-slate-900">Description</h4>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {selectedIssue.description || "No description provided."}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg font-semibold text-slate-900">Attachments</h4>
                    <span className="text-sm text-slate-500">{selectedIssue?.images?.length || 0} image(s)</span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {(selectedIssue.images || []).length ? (
                      selectedIssue.images.map((image) => (
                        <a
                          key={image.id}
                          href={getImageUrl(image.image)}
                          target="_blank"
                          rel="noreferrer"
                          className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                        >
                          <img
                            src={getImageUrl(image.image)}
                            alt="Issue attachment"
                            className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </a>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                        No attachments uploaded.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Reported at</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{formatDateTime(selectedIssue.created_at)}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Reporter email</p>
                  <p className="mt-2 break-all text-sm font-medium text-slate-900">{selectedIssue.email}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Issue ID</p>
                  <p className="mt-2 break-all text-sm font-medium text-slate-900">{selectedIssue.object_id}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Status</p>
                  <p className="mt-2 text-sm font-medium text-slate-900 capitalize">{formatStatusLabel(selectedIssue.status)}</p>
                </div>

                <div className="pt-3">
                  <p className="text-sm font-semibold text-slate-900">Quick actions</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Button
                      size="large"
                      loading={updatingActionKey === `${selectedIssue.object_id}-open`}
                      disabled={selectedIssue.status === "open" || isUpdating}
                      onClick={() => handleUpdateStatus(selectedIssue, "open")}
                      className="h-11 rounded-xl border-amber-200 bg-amber-50 text-amber-700 hover:!border-amber-300 hover:!text-amber-800"
                    >
                      Mark as open
                    </Button>
                    <Button
                      size="large"
                      loading={updatingActionKey === `${selectedIssue.object_id}-in_progress`}
                      disabled={selectedIssue.status === "in_progress" || isUpdating}
                      onClick={() => handleUpdateStatus(selectedIssue, "in_progress")}
                      className="h-11 rounded-xl border-sky-200 bg-sky-500 text-white hover:!border-sky-300 hover:!text-black"
                    >
                      Mark as in progress
                    </Button>
                    <Button
                      size="large"
                      loading={updatingActionKey === `${selectedIssue.object_id}-resolved`}
                      disabled={selectedIssue.status === "resolved" || isUpdating}
                      onClick={() => handleUpdateStatus(selectedIssue, "resolved")}
                      className="h-11 rounded-xl border-emerald-200 bg-emerald-500 text-white hover:!border-emerald-300 hover:!text-black"
                    >
                      Mark as resolved
                    </Button>
                    <Button
                      size="large"
                      onClick={() => setSelectedIssue(null)}
                      className="h-11 rounded-xl border-slate-200 text-slate-700 hover:!border-slate-300 hover:!text-black"
                    >
                      Close panel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
