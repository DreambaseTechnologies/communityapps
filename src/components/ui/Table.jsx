function Table({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={[
        'w-full overflow-x-auto',
        className,
      ].join(' ')}
    >
      <table
        className="w-full min-w-[640px] border-collapse text-left"
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function TableHeader({
  children,
  className = '',
  ...props
}) {
  return (
    <thead
      className={[
        'border-b border-slate-200',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </thead>
  )
}

function TableBody({
  children,
  className = '',
  ...props
}) {
  return (
    <tbody
      className={[
        'divide-y divide-slate-100',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </tbody>
  )
}

function TableRow({
  children,
  className = '',
  ...props
}) {
  return (
    <tr
      className={[
        'transition-colors hover:bg-slate-50',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </tr>
  )
}

function TableHead({
  children,
  align = 'left',
  className = '',
  ...props
}) {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <th
      scope="col"
      className={[
        'px-4 py-3',
        'text-xs font-bold uppercase tracking-wide text-slate-500',
        alignment[align] ?? alignment.left,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </th>
  )
}

function TableCell({
  children,
  align = 'left',
  className = '',
  ...props
}) {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <td
      className={[
        'px-4 py-4',
        'text-sm text-slate-700',
        alignment[align] ?? alignment.left,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </td>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
}